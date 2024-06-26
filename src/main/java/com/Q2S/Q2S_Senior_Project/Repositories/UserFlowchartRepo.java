package com.Q2S.Q2S_Senior_Project.Repositories;

import com.Q2S.Q2S_Senior_Project.Models.UserFlowchartModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface UserFlowchartRepo extends JpaRepository<UserFlowchartModel, Long> {

@Modifying
@Query("update UserFlowchartModel set termData = :newTermData where id = :id")
@Transactional
// Ensure the method runs within a transactional context
void updateFlowchart(@Param("newTermData") String newTermData, @Param("id") long id);
List<UserFlowchartModel> findByUserIdUserId(long userId);

}
