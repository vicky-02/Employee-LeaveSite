package springdemo.models;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "manager")

public class Manager{
    //
    public String name;
    private String email;

    private String role;

    public String password;

    private String cnpassword;

    public Manager(String name, String email, String role, String password, String cnpassword) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.password = password;
        this.cnpassword = cnpassword;

    }

    public String getName() {
        return name;
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
