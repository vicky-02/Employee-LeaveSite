package springdemo.rep;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import springdemo.models.Employee;
import springdemo.models.Manager;

@Repository

public class ManagerRepo {
    @Autowired
    private MongoOperations mongoOperations;
    public static final String collectionName="manager";
    public boolean check (String name){
        Query query = new Query(Criteria.where("name").is(name));
        Manager manager=mongoOperations.findOne(query, Manager.class, collectionName);
        if(manager!=null){
            return true;
        }
        else return false;
    }

    public Manager passCheck(String name, String password, String role) {
        Query query = new Query(Criteria.where("name").is(name).and("password").is(password).and("role").is(role));
        Manager manager = mongoOperations.findOne(query, Manager.class, collectionName);
        return manager;
    }
}
