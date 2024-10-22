package com.asseco.frontendcontainer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class FrontendContainerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FrontendContainerApplication.class, args);
	}

}

@Controller
class SomeController {
	@GetMapping("/")
	public String asd(Model model){
		Map map = new HashMap<>();
		map.put("asd","qqqqq");

		model.addAttribute("externalProperties", map);
		return "index";
	}
}
