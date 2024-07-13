package springdemo.models;

public class file {

    private String filename;
    private String fileType;
    private String fileSize;
    private byte[] file;

    public file(String filename, String fileType, String fileSize, byte[] file) {
        this.filename = filename;
        this.fileType = fileType;
        this.fileSize = fileSize;
        this.file = file;
    }

    public file() {

    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getFileSize() {
        return fileSize;
    }

    public void setFileSize(String fileSize) {
        this.fileSize = fileSize;
    }

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }
}
