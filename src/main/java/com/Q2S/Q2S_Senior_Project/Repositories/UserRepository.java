package com.Q2S.Q2S_Senior_Project.Repositories;

import com.Q2S.Q2S_Senior_Project.Models.UserModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<UserModel, Long> {}
