package springdemo.models;

public class DeveloperClient {

    public static void main(String args[]) {
        EmployeeSalary employeeSalary = EmployeeFactory.getEmployeeSalary("ANDROID DEVELOPER");
        int Salary = employeeSalary.Salary();
        System.out.println("Salary:" + Salary);

    }


}
