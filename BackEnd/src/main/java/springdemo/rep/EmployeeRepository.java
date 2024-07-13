package springdemo.rep;

import org.springframework.data.mongodb.repository.MongoRepository;
import springdemo.models.Employee;
import springdemo.models.Leaves;

import java.util.List;

public interface EmployeeRepository extends MongoRepository<Employee, String> {

    List<Employee> findByname(String name);
}
