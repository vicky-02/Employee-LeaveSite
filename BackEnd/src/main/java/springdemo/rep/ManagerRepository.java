package springdemo.rep;

import org.springframework.data.mongodb.repository.MongoRepository;
import springdemo.models.Employee;
import springdemo.models.Manager;

import java.util.List;

public interface ManagerRepository extends MongoRepository<Manager, String> {
    List<Manager> findByname(String name);
}
