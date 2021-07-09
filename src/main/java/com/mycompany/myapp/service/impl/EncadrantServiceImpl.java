package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Encadrant;
import com.mycompany.myapp.repository.EncadrantRepository;
import com.mycompany.myapp.service.EncadrantService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Encadrant}.
 */
@Service
@Transactional
public class EncadrantServiceImpl implements EncadrantService {

    private final Logger log = LoggerFactory.getLogger(EncadrantServiceImpl.class);

    private final EncadrantRepository encadrantRepository;

    public EncadrantServiceImpl(EncadrantRepository encadrantRepository) {
        this.encadrantRepository = encadrantRepository;
    }

    @Override
    public Encadrant save(Encadrant encadrant) {
        log.debug("Request to save Encadrant : {}", encadrant);
        return encadrantRepository.save(encadrant);
    }

    @Override
    public Optional<Encadrant> partialUpdate(Encadrant encadrant) {
        log.debug("Request to partially update Encadrant : {}", encadrant);

        return encadrantRepository
            .findById(encadrant.getId())
            .map(
                existingEncadrant -> {
                    if (encadrant.getNom() != null) {
                        existingEncadrant.setNom(encadrant.getNom());
                    }
                    if (encadrant.getPrenom() != null) {
                        existingEncadrant.setPrenom(encadrant.getPrenom());
                    }
                    if (encadrant.getMail() != null) {
                        existingEncadrant.setMail(encadrant.getMail());
                    }

                    return existingEncadrant;
                }
            )
            .map(encadrantRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Encadrant> findAll() {
        log.debug("Request to get all Encadrants");
        return encadrantRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Encadrant> findOne(Long id) {
        log.debug("Request to get Encadrant : {}", id);
        return encadrantRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Encadrant : {}", id);
        encadrantRepository.deleteById(id);
    }
}
