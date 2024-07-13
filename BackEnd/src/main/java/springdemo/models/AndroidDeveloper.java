package springdemo.models;

public class AndroidDeveloper implements EmployeeSalary {



    @Override
    public int Salary() {
        System.out.println("getting Android Developer salary:");
        return 50000;
    }
}
