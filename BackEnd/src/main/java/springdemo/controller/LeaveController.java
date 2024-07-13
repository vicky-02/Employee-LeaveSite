package springdemo.controller;


import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springdemo.models.Leaves;
import springdemo.models.file;
import springdemo.rep.EmployeeRepo;
import springdemo.rep.LeaveRepository;
import org.apache.commons.io.IOUtils;


import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/leave")
public class LeaveController {

    @Autowired
    private MongoOperations mongoOperations;
    @Autowired
    private LeaveRepository leaveRepository;
    @Autowired
    private EmployeeRepo employeeRepo;

//    @PostMapping("/employee")
//    public ResponseEntity<?> addLeaves(@RequestBody Leaves leaves){
//
//        String StartDate=leaves.getStartDate();
//        String Manager= leaves.getManager();
//        String name= leaves.getName();
//        System.out.println("Manager : " + Manager);
//        System.out.println("name :" + name);
//
//
//        Leaves save = this.leaveRepository.save(leaves);
//        return ResponseEntity.ok(save);
//
//
//    }

//    @PostMapping("/employee")
//    public ResponseEntity<?> addLeaves(@RequestPart("leaves") Leaves leaves,
//                                       @RequestParam("file") MultipartFile file){
//
//        String startDate = leaves.getStartDate();
//        String manager = leaves.getManager();
//        String name = leaves.getName();
//        System.out.println("Manager: " + manager);
//        System.out.println("Name: " + name);
//
//        // Handle file upload here
//        if (!file.isEmpty()) {
//            // Process the file (save it, etc.)
//        }
//
//        // Save the leave object
//        Leaves savedLeave = this.leaveRepository.save(leaves);
//        return ResponseEntity.ok(savedLeave);
//    }




    @PostMapping("/employee")
    public ResponseEntity<?> addLeaves(@RequestParam("file") MultipartFile file,
                                       @RequestParam("name") String name,
                                       @RequestParam("startDate") String startDate,
                                       @RequestParam("endDate") String endDate,
                                       @RequestParam("manager") String manager,
                                       @RequestParam("reason") String reason,
                                       @RequestParam("leaveType") String leaveType,
                                       @RequestParam("status") String status)
                                        throws IOException
    {

//        add(file);
//        Leaves leave=new Leaves(startDate,endDate,leaveType,reason,status,name,fileId,manager);
////        return new ResponseEntity<>(save(leave), HttpStatus.OK);
//
        Leaves leave = new Leaves(name, startDate, endDate,manager, reason, leaveType,  status, add(file) );
        Leaves savedLeave = leaveRepository.save(leave);
        return ResponseEntity.ok(savedLeave);




    }
    @Autowired
    private GridFsTemplate template;
    @Autowired
    private GridFsOperations operations;

    public String add(MultipartFile file) throws IOException {


//        DBObject metadata = new BasicDBObject();
        DBObject metadata= SingletonClass.getinstance();  //Singleton Design Pattern
        metadata.put("fileSize", file.getSize());


        Object fileID = template.store(file.getInputStream(), file.getOriginalFilename(), file
                .getContentType(), metadata);


        return fileID.toString();
    }

    @GetMapping("/getFile/{id}")
    public ResponseEntity<ByteArrayResource> download(@PathVariable String id) throws IOException {
        file loadFile = downloadFile(id);
        String mimeType = "application/pdf";
        if (loadFile.getFile() == null) {

            return ResponseEntity.notFound().build();
        }
        ByteArrayResource resource = new ByteArrayResource(loadFile.getFile());
        System.out.println(resource);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(  mimeType ))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + loadFile.getFilename() + "\"")
                .body(resource);
    }

    public file downloadFile(String id) throws IOException {


        GridFSFile gridFSFile = template.findOne( new Query(Criteria.where("_id").is(id)) );



        file file = new file();

        if (gridFSFile != null && gridFSFile.getMetadata() != null) {
            file.setFilename( gridFSFile.getFilename() );

            file.setFileType( gridFSFile.getMetadata().get("_contentType").toString() );

            file.setFileSize( gridFSFile.getMetadata().get("fileSize").toString() );

            file.setFile( IOUtils.toByteArray(operations.getResource(gridFSFile).getInputStream()) );
        }

        return file;
    }

//    @PostMapping(value="/save")
//    public ResponseEntity<?> saveLeave(@RequestParam("fromDate") String fromDate,
//                                       @RequestParam("toDate") String toDate,
//                                       @RequestParam("leaveType") String leaveType,
//                                       @RequestParam("reason") String reason,
//                                       @RequestParam("status") String status,
//                                       @RequestParam("empName") String empName,
//                                       @RequestParam("manager") String manager,
//                                       @RequestParam(value = "fileUpload") MultipartFile fileUpload) throws IOException {
//
//        l.addFile(fileUpload);
//        Leaves leave=new Leaves(fromDate,toDate,leaveType,reason,status,empName,FileId,manager);
//        return new ResponseEntity<>(l.save(leave), HttpStatus.OK);
//    }



//    @GetMapping("/leaves/{name}/{role}")
//    @GetMapping("/leaves")
//    public ResponseEntity<List<Leaves>> getAllLeaves() {
//        List<Leaves> leaves = leaveRepository.findAll();
//        System.out.println("Leaves: " + leaves); // Add this line to log the leaves data
//        return ResponseEntity.ok(leaves);
//    }


    // Employee See their applied Leaves
    @GetMapping("/employee/{name}")
    public ResponseEntity<?> getAllLeavesEmployee(@PathVariable("name") String name) {
        System.out.println(name);
        try {
            List<Leaves> leavesList = leaveRepository.findByname(name);
            System.out.println(leavesList);
            return ResponseEntity.ok(leavesList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching form data");
        }
    };









    // Manager See thier Requested Leaves

    @GetMapping("/manager/{name}")
    public ResponseEntity<?> getAllLeavesManager(@PathVariable("name") String name) {
        System.out.println(name);
        try {
            List<Leaves> leavesList = leaveRepository.findByManager(name);
            System.out.println(leavesList);
            return ResponseEntity.ok(leavesList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching form data");
        }
    };

    //Update by Id


    @PutMapping("/accept/{id}")
    public ResponseEntity<?> acceptLeaveById(@PathVariable("id") String id) {
        System.out.println("enter to accept by Id " + id);


        Optional<Leaves> leaveOptional= leaveRepository.findById(id);

        if (leaveOptional.isPresent()) {
            Leaves leave = leaveOptional.get();
            System.out.println("Enter to if cond:");

            // Update the status of the leave to "Accepted"
            leave.setStatus("Accepted");
            leaveRepository.save(leave);

            return ResponseEntity.ok().build(); // Return 200 OK if update is successful
        } else {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if leave does not exist
        }
    }
    @PutMapping("/reject/{id}")
    public ResponseEntity<?> rejectLeaveById(@PathVariable("id") String id) {
        System.out.println("enter to reject by Id " + id);

        Optional<Leaves> leaveOptional= leaveRepository.findById(id);

        if (leaveOptional.isPresent()) {
            Leaves leave = leaveOptional.get();
            System.out.println("Enter to if cond:");

            // Update the status of the leave to "Accepted"
            leave.setStatus("Rejected");
            leaveRepository.save(leave);



            return ResponseEntity.ok().build(); // Return 200 OK if update is successful
        } else {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if leave does not exist
        }
    }


@PutMapping("/employee/{id}")
public ResponseEntity<?> editLeaves(@PathVariable("id") String id, @RequestBody Leaves leaves){

    String name= leaves.getName();
    String StartDate=leaves.getStartDate();
    String EndDate= leaves.getEndDate();
    String reason= leaves.getReason();
    String LeaveType= leaves.getLeaveType();
    String Manager= leaves.getManager();

    System.out.println("Manager : " + Manager);
    System.out.println("name :" + name);

    System.out.println("enter to accept by Id " + id);


    Optional<Leaves> leaveOptional= leaveRepository.findById(id);

    if (leaveOptional.isPresent()) {
        Leaves leave = leaveOptional.get();
        System.out.println("Enter to if cond:");

        // Update the status of the leave to "Accepted"
        leave.setName(name);
        leave.setStartDate(StartDate);
        leave.setEndDate(EndDate);
        leave.setManager(Manager);
        leave.setReason(reason);
        leave.setLeaveType(LeaveType);


//            leave.setStatus("Accepted");
        leaveRepository.save(leave);

        return ResponseEntity.ok().build(); // Return 200 OK if update is successful
    } else {
        return ResponseEntity.notFound().build(); // Return 404 Not Found if leave does not exist
    }



}

//    @GetMapping("/pagination/{name}")
//    public ResponseEntity<?> getManagerLeaves(@PathVariable("name") String name) {
//        System.out.println("pagination name: " + name);
//        try {
//            List<Leaves> leavesList = leaveRepository.findByManager(name);
//            System.out.println(leavesList);
//            return ResponseEntity.ok(leavesList);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching form data");
//        }
//    };


    @GetMapping("/pagination/{name}")
    public ResponseEntity<?> getManagerLeaves(
            @PathVariable("name") String name,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize )

    {
        System.out.println("pagination name: " + name);
        try {

            List<Leaves> leavesList = leaveRepository.findByManager(name);

            // Calculate the offset based on the page and pageSize
            int offset = (page - 1) * pageSize;

            // Retrieve paginated data from your data source (e.g., database)
            List<Leaves> leaves = leaveRepository.findByManager(name, offset, pageSize);

            // Retrieve the total count of items (for calculating totalPages)
//            long totalCount = leaveRepository.countByManager(name);
            long leavesCount = leaveRepository.countByManager(name);

            // Construct the response with paginated data and metadata
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("leaves", leaves);
            responseData.put("totalCount", leavesCount);
            System.out.println("leavesCount : "+ leavesCount );

//            return ResponseEntity.ok(leavesList);
            return ResponseEntity.ok(responseData);

        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching form data");
        }
    };

    @GetMapping("/empl/pagination/{name}")
    public ResponseEntity<?> getemplLeaves(
            @PathVariable("name") String name,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize )

    {
        System.out.println("pagination name: " + name);
        try {

//            List<Leaves> leavesList = leaveRepository.findByManager(name);

            // Calculate the offset based on the page and pageSize
            int offset = (page - 1) * pageSize;

            // Retrieve paginated data from your data source (e.g., database)
            List<Leaves> leaves = leaveRepository.findByname(name, offset, pageSize);

            // Retrieve the total count of items (for calculating totalPages)
//            long totalCount = leaveRepository.countByManager(name);
            long leavesCount = leaveRepository.countByname(name);

            // Construct the response with paginated data and metadata
            Map<String, Object> responseData = new HashMap<>();
            responseData.put("leaves", leaves);
            responseData.put("totalCount", leavesCount);
            System.out.println("leavesCount : "+ leavesCount );

//            return ResponseEntity.ok(leavesList);
            return ResponseEntity.ok(responseData);

        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetching form data");
        }
    };



    // DELETE leave by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLeaveById(@PathVariable("id") String id) {
        System.out.println("enter to delete func");
        System.out.println("Received ID for deletion: " + id);

        // Check if the leave exists
        if (leaveRepository.existsById(id)) {
            System.out.println("enter to if cond:");
            // Delete the leave by ID
            leaveRepository.deleteById(id);
            return ResponseEntity.ok().build(); // Return 200 OK if deletion is successful
        } else {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if leave does not exist
        }
    }

    @DeleteMapping("/deleteAll/{name}")
    public ResponseEntity<?> deleteLeavesByName(@PathVariable("name") String name) {
        System.out.println("Entering deleteLeavesByName function");
        System.out.println("Received name for deletion: " + name);

        // Find all leaves with the given name
        List<Leaves> leavesToDelete = leaveRepository.findAllByName(name);

        if (!leavesToDelete.isEmpty()) {
            System.out.println("Leaves found for deletion");

            // Delete each leave in the list
            for (Leaves leave : leavesToDelete) {
                leaveRepository.delete(leave);
            }

            System.out.println("Leaves deleted successfully");
            return ResponseEntity.ok().build(); // Return 200 OK if deletion is successful
        } else {
            System.out.println("No leaves found for deletion");
            return ResponseEntity.notFound().build(); // Return 404 Not Found if no leaves found
        }
    }



}
