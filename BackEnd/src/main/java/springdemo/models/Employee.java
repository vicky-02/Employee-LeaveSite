package springdemo.models;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "employee")
public class Employee {
//
    public String name;

    private String id;

    private String email;

    private String role;

    public String password;

    private String cnpassword;

//    private String ContactNo;

    public Employee(String name, String email, String role, String password, String cnpassword, String id) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
        this.cnpassword = cnpassword;
        this.id=id;


    }

    public String getName() {
        return name;
    }

    public String getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public String getPassword() {
        return password;
    }

    public String getCnpassword() {
        return cnpassword;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setCnpassword(String cnpassword) {
        this.cnpassword = cnpassword;
    }



}
