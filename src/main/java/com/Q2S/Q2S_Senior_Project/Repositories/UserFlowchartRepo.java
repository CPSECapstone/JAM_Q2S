package com.Q2S.Q2S_Senior_Project.Repositories;

import com.Q2S.Q2S_Senior_Project.Models.UserFlowchartModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserFlowchartRepo extends JpaRepository<UserFlowchartModel, Long> {
//    List<UserFlowchartModel> findByUserIdId(long userId);

}
