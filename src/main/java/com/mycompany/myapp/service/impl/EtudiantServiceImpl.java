package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Etudiant;
import com.mycompany.myapp.repository.EtudiantRepository;
import com.mycompany.myapp.service.EtudiantService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Etudiant}.
 */
@Service
@Transactional
public class EtudiantServiceImpl implements EtudiantService {

    private final Logger log = LoggerFactory.getLogger(EtudiantServiceImpl.class);

    private final EtudiantRepository etudiantRepository;

    public EtudiantServiceImpl(EtudiantRepository etudiantRepository) {
        this.etudiantRepository = etudiantRepository;
    }

    @Override
    public Etudiant save(Etudiant etudiant) {
        log.debug("Request to save Etudiant : {}", etudiant);
        return etudiantRepository.save(etudiant);
    }

    @Override
    public Optional<Etudiant> partialUpdate(Etudiant etudiant) {
        log.debug("Request to partially update Etudiant : {}", etudiant);

        return etudiantRepository
            .findById(etudiant.getId())
            .map(
                existingEtudiant -> {
                    if (etudiant.getNom() != null) {
                        existingEtudiant.setNom(etudiant.getNom());
                    }
                    if (etudiant.getPrenom() != null) {
                        existingEtudiant.setPrenom(etudiant.getPrenom());
                    }
                    if (etudiant.getMail() != null) {
                        existingEtudiant.setMail(etudiant.getMail());
                    }
                    if (etudiant.getEncadrant() != null) {
                        existingEtudiant.setEncadrant(etudiant.getEncadrant());
                    }

                    return existingEtudiant;
                }
            )
            .map(etudiantRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Etudiant> findAll() {
        log.debug("Request to get all Etudiants");
        return etudiantRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Etudiant> findOne(Long id) {
        log.debug("Request to get Etudiant : {}", id);
        return etudiantRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Etudiant : {}", id);
        etudiantRepository.deleteById(id);
    }
}
