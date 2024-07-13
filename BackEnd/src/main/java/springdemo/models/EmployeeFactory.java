package springdemo.models;

public class EmployeeFactory {
//    get the employee Salary

    public static EmployeeSalary getEmployeeSalary(String empType){
        if(empType.trim().equalsIgnoreCase("ANDROID DEVELOPER"))
            return new AndroidDeveloper();
        else if(empType.trim().equalsIgnoreCase("WEB DEVELOPER"))
            return new WebDeveloper();
        else
            return null;
    }
}
