import { useState } from "react";
import Papa from "papaparse";

export default function useParseCSV() {
    const [data, setData] = useState(null);
    const [filename, setFilename] = useState("");

    const parse = (file, config) => {
        return new Promise((resolve, reject) => {
            // Reset state at start of new parse
            setData(null);
            setFilename("");

            const { headers, validateRow, transform } = config;

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
                        setData(finalData);
                        setFilename(file.name);
                        resolve(finalData);
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

    const reset = () => {
        setData(null);
        setFilename("");
    };

    return {
        data,
        filename,
        parse,
        reset
    };
}
