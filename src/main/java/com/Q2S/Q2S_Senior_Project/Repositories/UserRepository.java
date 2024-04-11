package com.Q2S.Q2S_Senior_Project.Repositories;

import com.Q2S.Q2S_Senior_Project.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

}

