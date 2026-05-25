import Papa from "papaparse";

function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1,     // insertion
                    matrix[i - 1][j] + 1      // deletion
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

function guessCompanyFromFilename(filename, companies) {
    if (!companies || companies.length === 0) return "";
    const cleanFilename = filename.toLowerCase().replace('.csv', '').replace(/[^a-z]/g, ' ');
    const words = cleanFilename.split(/\s+/).filter(w => w.length > 2);
    const ignoreWords = new Set(["bank", "credit", "card", "union", "federal", "statement", "the", "and"]);

    let bestMatch = "";
    let bestScore = 0.65; // Threshold for a word to be considered a fuzzy match

    for (const company of companies) {
        const cleanCompany = company.toLowerCase().replace(/[^a-z]/g, ' ').trim();

        // 1. Check for exact substring match (with and without spaces)
        if (cleanFilename.includes(cleanCompany.replace(/\s+/g, '')) || cleanFilename.includes(cleanCompany)) {
            return company;
        }

        // 2. Fuzzy match word by word for misspellings
        for (const word of words) {
            if (ignoreWords.has(word)) continue;

            for (const compWord of cleanCompany.split(/\s+/)) {
                if (compWord.length < 3 || ignoreWords.has(compWord)) continue;

                const dist = levenshtein(word, compWord);
                const maxLen = Math.max(word.length, compWord.length);
                const score = (maxLen - dist) / maxLen;

                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = company;
                }
            }
        }
    }
    return bestMatch;
}

export default function useParseCSV() {
    const parse = (file, config) => {
        return new Promise((resolve, reject) => {
            const { headers, validateRow, transform, companies } = config;

            if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
                reject("File is not a valid csv type");
                return;
            }

            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const { data: rawData, errors, meta } = results;

                    if (errors.length) {
                        reject("CSV parsing error: " + errors[0].message);
                        return;
                    }

                    const actualHeaders = meta.fields;
                    const missing = headers.filter(h => !actualHeaders.includes(h));
                    const extra = actualHeaders.filter(h => !headers.includes(h));

                    if (missing.length > 0) {
                        reject(`Missing columns: ${missing.join(", ")}`);
                        return;
                    }
                    if (extra.length > 0) {
                        console.warn(`Extra columns: ${extra.join(", ")}`);
                    }

                    // User logic: validateRow returns TRUE if the row is INVALID
                    const invalid = rawData.filter(validateRow);

                    if (invalid.length > 0) {
                        reject(`Found ${invalid.length} invalid rows`);
                        return;
                    }

                    try {
                        const finalData = rawData.map(transform);
                        const guessed = guessCompanyFromFilename(file.name, companies);
                        
                        resolve({ 
                            data: finalData,
                            guessedCompany: guessed,
                            filename: file.name,
                            lastModified: file.lastModified
                        });
                    } catch (err) {
                        reject("Error transforming data: " + err.message);
                    }
                },
                error: (err) => {
                    reject("Papa Parse error: " + err.message);
                }
            });
        });
    };

    return {
        parse
    };
}
