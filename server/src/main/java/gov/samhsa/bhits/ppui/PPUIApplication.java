package gov.samhsa.bhits.ppui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@Controller
public class PPUIApplication {

    public static void main(String[] args) {
        SpringApplication.run(PPUIApplication.class, args);
    }

    @RequestMapping(value = "/fe/**")
    public String redirect() {
        return "forward:/";
    }

}
