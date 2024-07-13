package springdemo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springdemo.models.Employee;
import springdemo.models.Manager;
import springdemo.rep.EmployeeRepo;
import springdemo.rep.EmployeeRepository;
import springdemo.rep.ManagerRepo;
import springdemo.rep.ManagerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;



import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController


@RequestMapping("/user")
//@CrossOrigin("http://localhost:3000/")



public class MyController {

    @Autowired
    private MongoOperations mongoOperations;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    private ManagerRepository managerRepository;

    @Autowired
    private ManagerRepo managerRepo;
    @PostMapping("/register/employee")
    public ResponseEntity<?> addEmployee(@RequestBody Employee employee)

    {
        String EmployeeName=employee.getName();
        System.out.println(employee);
        if(employeeRepo.check(EmployeeName)){
            System.out.println("data already present");
            return null;
        }




      Employee save = this.employeeRepository.save(employee);
      return ResponseEntity.ok(save);
    }


    // Calling LOgin
//    @PostMapping("/login")
//    public ResponseEntity<?> loginEmployee(@RequestBody Employee employee) {
//        String username = employee.getName();
//        String password = employee.getPassword();
//
//        System.out.println("Incoming login request:");
//        System.out.println("Username: " + username);
//        System.out.println("Password: " + password);
//        // Check if username and password match in the database
//       // If login is successful, print "Login successful" to the console
//        if(employeeRepo.passCheck(username, password)){
//           System.out.println("Login successful");
//           return ResponseEntity.ok().build();
//        } else {
//            System.out.println("Login failed");
//           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
//        }
//    }

    @PostMapping("/login/employee")
    public ResponseEntity<?> loginEmployee(@RequestBody Employee employee) {
        String username = employee.getName();
        String password = employee.getPassword();
        String role = employee.getRole();

        System.out.println("Incoming login request:");
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);
//        System.out.println("role: " + role);
        // Authenticate the user
        Employee authenticatedEmployee = employeeRepo.passCheck(username, password,role);
        if (authenticatedEmployee != null) {
            System.out.println("Login successful");
            // Return the authenticated employee along with the success message
            return ResponseEntity.ok(authenticatedEmployee);
        } else {
            System.out.println("Login failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }



    @PostMapping("/register/manager")
    public ResponseEntity<?> addManager(@RequestBody Manager manager) {

        String ManagerName=manager.getName();

        if(managerRepo.check(ManagerName)){
            System.out.println("data already present");
            return null;
        }

        Manager save = this.managerRepository.save(manager);
        return ResponseEntity.ok(save);
    }

    @PostMapping("/login/manager")
    public ResponseEntity<?> loginManager(@RequestBody Manager manager) {
        String name = manager.getName();
        String password = manager.getPassword();
        String role = manager.getRole();


        System.out.println("Incoming login request:");
        System.out.println("Username: " + name);
        System.out.println("Password: " + password);
        System.out.println("role: " + role);

        // Authenticate the user
        Manager authenticatedManger = managerRepo.passCheck(name, password, role);
        if (authenticatedManger != null) {
            System.out.println("Login successful");
            // Return the authenticated employee along with the success message
            return ResponseEntity.ok(authenticatedManger);
        } else {
            System.out.println("Login failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

//    Update Password for employee


    @PutMapping("/updateEmployeePwd/{name}")
    public ResponseEntity<String> updatePassword(@PathVariable String name, @RequestBody Map<String, String> passwords) {
        try {
            String oldPassword = passwords.get("oldPassword");
            String newPassword = passwords.get("newPassword");

            // Find the employee by name
            List<Employee> employees = employeeRepository.findByname(name);
            if (!employees.isEmpty()) {
                Employee employee = employees.get(0);

                // Check if the old password matches the current password
                if (!employee.getPassword().equals(oldPassword)) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Old password does not match");
                }

                // Update the password
                employee.setPassword(newPassword);

                // Save the updated employee
                employeeRepository.save(employee);

                // Return success response
                return ResponseEntity.ok("Password updated successfully");
            } else {
                // Return error response if employee not found
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
            }
        } catch (Exception e) {
            // Return error response if any other exception occurs
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating password: " + e.getMessage());
        }
    }

    //    Update Password for manager

    @PutMapping("/updateManagerPwd/{name}")
    public ResponseEntity<String> updateManagerPassword(@PathVariable String name, @RequestBody Map<String, String> passwords) {
        try {
            String oldPassword = passwords.get("oldPassword");
            String newPassword = passwords.get("newPassword");

            // Find the manager by name
            List<Manager> managers = managerRepository.findByname(name);
            if (!managers.isEmpty()) {
                Manager manager = managers.get(0);


                // Check if the old password matches the current password
                if (!manager.getPassword().equals(oldPassword)) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Old password does not match");
                }

                // Update the password
                manager.setPassword(newPassword);

                // Save the updated employee
                managerRepository.save(manager);

                // Return success response
                return ResponseEntity.ok("Password updated successfully");
            } else {
                // Return error response if employee not found
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
            }
        } catch (Exception e) {
            // Return error response if any other exception occurs
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating password: " + e.getMessage());
        }
    }

    // DELETE leave by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmplById(@PathVariable("id") String id) {
        System.out.println("enter to delete func");
        System.out.println("Received ID for deletion: " + id);

        // Check if the leave exists
        if (employeeRepository.existsById(id)) {
            System.out.println("enter to if cond:");
            // Delete the leave by ID
            employeeRepository.deleteById(id);
            return ResponseEntity.ok().build(); // Return 200 OK if deletion is successful
        } else {
            return ResponseEntity.notFound().build(); // Return 404 Not Found if leave does not exist
        }
    }
    @GetMapping("/managers")
    public ResponseEntity<?> getManagers() {
        return ResponseEntity.ok(this.managerRepository.findAll());
    }



    @GetMapping("/empllist")
    public ResponseEntity<?> getEmployee()
    {

        return ResponseEntity.ok(this.employeeRepository.findAll());
    }

}
