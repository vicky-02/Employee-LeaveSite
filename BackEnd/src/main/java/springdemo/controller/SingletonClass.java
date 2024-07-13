package springdemo.controller;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

public class SingletonClass {

        private static DBObject ob;
        public static DBObject getinstance(){
            if(ob==null)
                ob= new BasicDBObject();
            return ob;
        }

    }

