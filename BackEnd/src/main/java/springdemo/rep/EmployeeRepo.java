package springdemo.rep;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import springdemo.models.Employee;

@Repository

public class EmployeeRepo {

    @Autowired
    private MongoOperations mongoOperations;
    public static final String collectionName="employee";
    public boolean check (String name){
        Query query = new Query(Criteria.where("name").is(name));
        Employee employee=mongoOperations.findOne(query, Employee.class, collectionName);
        if(employee!=null){
            return true;
        }
        else return false;
    }

//    public boolean passCheck (String name, String password) {
//        Query query1 = new Query(Criteria.where("name").is(name));
//        Query query2 = new Query(Criteria.where("password").is(password));
//        Employee nameEmployee1 = mongoOperations.findOne(query1, Employee.class, collectionName);
//        Employee passEmployee2 = mongoOperations.findOne(query2, Employee.class, collectionName);
//        if (nameEmployee1 != null) {
//            if (passEmployee2 != null)
//                return true;
//        }
//
//        return false;

//    public boolean passCheck(String name, String password) {
//        Query query = new Query(Criteria.where("name").is(name).and("password").is(password));
//        Employee employee = mongoOperations.findOne(query, Employee.class, collectionName);
//        return employee != null;
//    }

    public Employee passCheck(String name, String password, String role) {
        Query query = new Query(Criteria.where("name").is(name).and("password").is(password).and("role").is(role));
        Employee employee = mongoOperations.findOne(query, Employee.class, collectionName);
        return employee;
    }



}

