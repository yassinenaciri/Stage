package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Encadrant;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Encadrant}.
 */
public interface EncadrantService {
    /**
     * Save a encadrant.
     *
     * @param encadrant the entity to save.
     * @return the persisted entity.
     */
    Encadrant save(Encadrant encadrant);

    /**
     * Partially updates a encadrant.
     *
     * @param encadrant the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Encadrant> partialUpdate(Encadrant encadrant);

    /**
     * Get all the encadrants.
     *
     * @return the list of entities.
     */
    List<Encadrant> findAll();

    /**
     * Get the "id" encadrant.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Encadrant> findOne(Long id);

    /**
     * Delete the "id" encadrant.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
