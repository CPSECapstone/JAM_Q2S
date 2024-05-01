package com.Q2S.Q2S_Senior_Project.Repositories;

import com.Q2S.Q2S_Senior_Project.Models.UserFlowchartModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFlowchartRepo extends JpaRepository<UserFlowchartModel, Long> {

    List<UserFlowchartModel> findByUserIdUserId(long userId);

}
