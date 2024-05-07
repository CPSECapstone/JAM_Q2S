package com.Q2S.Q2S_Senior_Project.Repositories;

import com.Q2S.Q2S_Senior_Project.Models.FlowchartTemplateModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FlowchartTemplateRepo extends JpaRepository<FlowchartTemplateModel, Long> {

    Optional<FlowchartTemplateModel> findByCatalogAndAndMajorAndConcentration(String catalog, String major, String concentration);

    void deleteByCatalog(String catalog);
}
