package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Encadrant;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Encadrant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EncadrantRepository extends JpaRepository<Encadrant, Long> {}
