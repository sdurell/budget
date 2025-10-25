package com.sdurell.budget.exception;

public class DuplicateFilenameException extends RuntimeException {
    public DuplicateFilenameException(String filename) {
        super("A statement with filename '" + filename + "' already exists.");
    }
}
