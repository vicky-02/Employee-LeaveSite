package springdemo.models;

public class WebDeveloper implements EmployeeSalary{
    @Override
    public int Salary() {
        System.out.println("Getting Web Developer salary");
        return 40000;
    }
}
