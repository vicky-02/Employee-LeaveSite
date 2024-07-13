package springdemo.rep;

import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;
import springdemo.models.Leaves;

import java.awt.print.Pageable;
import java.util.List;

public interface LeaveRepository extends MongoRepository<Leaves, String> {
    List<Leaves> findByname(String name);
    List<Leaves> findByManager(String name);

    List<Leaves> findAllByName(String name);


    List<Leaves> findByManager(String name, int offset, int pageSize);

//    long  countByManagerName(String manager);

    long countByManager(String manager);

    List<Leaves> findByname(String name, int offset, int pageSize);

    long countByname(String manager);



}