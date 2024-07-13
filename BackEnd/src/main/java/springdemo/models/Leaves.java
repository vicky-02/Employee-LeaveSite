package springdemo.models;

import org.springframework.web.multipart.MultipartFile;

public class Leaves {

    private String id;
    private String name;

    private String startDate;
    private String endDate;
    private String manager;
    private String reason;
    private String leaveType;
    private String status;

    private  String fileId;


    // Constructors

    public Leaves() {
    }

    public Leaves(String name, String startDate, String endDate, String manager, String reason, String leaveType, String status, String fileId) {
        this.name= name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.manager = manager;
        this.reason = reason;
        this.leaveType = leaveType;
        this.status = status;

        this.fileId= fileId;

    }

    // Getters and Setters
    //name


//    public MultipartFile getFile() {
//        return file;
//    }
//
//    public void setFile(MultipartFile file) {
//        this.file = file;
//    }


    public String getFileId() {
        return fileId;
    }

    public void setFileId(String fileId) {
        this.fileId = fileId;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // ID
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Start Date
    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    // End Date
    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    // Manager
    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

    // Reason
    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    // Leave Type
    public String getLeaveType() {
        return leaveType;
    }

    public void setLeaveType(String leaveType) {
        this.leaveType = leaveType;
    }

    // Status
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // toString() method
    @Override
    public String toString() {
        return "Leaves{" +
                "id='" + id + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", manager='" + manager + '\'' +
                ", reason='" + reason + '\'' +
                ", leaveType='" + leaveType + '\'' +
                ", status='" + status + '\'' +
                '}';
    }


}
