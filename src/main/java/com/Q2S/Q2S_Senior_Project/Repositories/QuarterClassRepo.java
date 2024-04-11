package com.Q2S.Q2S_Senior_Project.Repositories;

import com.Q2S.Q2S_Senior_Project.Models.QuarterClassModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuarterClassRepo extends JpaRepository<QuarterClassModel, String> {
}
