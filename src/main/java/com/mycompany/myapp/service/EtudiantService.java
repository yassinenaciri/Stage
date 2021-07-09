package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Etudiant;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Etudiant}.
 */
public interface EtudiantService {
    /**
     * Save a etudiant.
     *
     * @param etudiant the entity to save.
     * @return the persisted entity.
     */
    Etudiant save(Etudiant etudiant);

    /**
     * Partially updates a etudiant.
     *
     * @param etudiant the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Etudiant> partialUpdate(Etudiant etudiant);

    /**
     * Get all the etudiants.
     *
     * @return the list of entities.
     */
    List<Etudiant> findAll();

    /**
     * Get the "id" etudiant.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Etudiant> findOne(Long id);

    /**
     * Delete the "id" etudiant.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
