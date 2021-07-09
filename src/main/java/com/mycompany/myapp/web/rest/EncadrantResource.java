package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Encadrant;
import com.mycompany.myapp.repository.EncadrantRepository;
import com.mycompany.myapp.service.EncadrantService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Encadrant}.
 */
@RestController
@RequestMapping("/api")
public class EncadrantResource {

    private final Logger log = LoggerFactory.getLogger(EncadrantResource.class);

    private static final String ENTITY_NAME = "encadrant";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EncadrantService encadrantService;

    private final EncadrantRepository encadrantRepository;

    public EncadrantResource(EncadrantService encadrantService, EncadrantRepository encadrantRepository) {
        this.encadrantService = encadrantService;
        this.encadrantRepository = encadrantRepository;
    }

    /**
     * {@code POST  /encadrants} : Create a new encadrant.
     *
     * @param encadrant the encadrant to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new encadrant, or with status {@code 400 (Bad Request)} if the encadrant has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/encadrants")
    public ResponseEntity<Encadrant> createEncadrant(@RequestBody Encadrant encadrant) throws URISyntaxException {
        log.debug("REST request to save Encadrant : {}", encadrant);
        if (encadrant.getId() != null) {
            throw new BadRequestAlertException("A new encadrant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Encadrant result = encadrantService.save(encadrant);
        return ResponseEntity
            .created(new URI("/api/encadrants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /encadrants/:id} : Updates an existing encadrant.
     *
     * @param id the id of the encadrant to save.
     * @param encadrant the encadrant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated encadrant,
     * or with status {@code 400 (Bad Request)} if the encadrant is not valid,
     * or with status {@code 500 (Internal Server Error)} if the encadrant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/encadrants/{id}")
    public ResponseEntity<Encadrant> updateEncadrant(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Encadrant encadrant
    ) throws URISyntaxException {
        log.debug("REST request to update Encadrant : {}, {}", id, encadrant);
        if (encadrant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, encadrant.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!encadrantRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Encadrant result = encadrantService.save(encadrant);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, encadrant.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /encadrants/:id} : Partial updates given fields of an existing encadrant, field will ignore if it is null
     *
     * @param id the id of the encadrant to save.
     * @param encadrant the encadrant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated encadrant,
     * or with status {@code 400 (Bad Request)} if the encadrant is not valid,
     * or with status {@code 404 (Not Found)} if the encadrant is not found,
     * or with status {@code 500 (Internal Server Error)} if the encadrant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/encadrants/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Encadrant> partialUpdateEncadrant(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Encadrant encadrant
    ) throws URISyntaxException {
        log.debug("REST request to partial update Encadrant partially : {}, {}", id, encadrant);
        if (encadrant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, encadrant.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!encadrantRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Encadrant> result = encadrantService.partialUpdate(encadrant);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, encadrant.getId().toString())
        );
    }

    /**
     * {@code GET  /encadrants} : get all the encadrants.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of encadrants in body.
     */
    @GetMapping("/encadrants")
    public List<Encadrant> getAllEncadrants() {
        log.debug("REST request to get all Encadrants");
        return encadrantService.findAll();
    }

    /**
     * {@code GET  /encadrants/:id} : get the "id" encadrant.
     *
     * @param id the id of the encadrant to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the encadrant, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/encadrants/{id}")
    public ResponseEntity<Encadrant> getEncadrant(@PathVariable Long id) {
        log.debug("REST request to get Encadrant : {}", id);
        Optional<Encadrant> encadrant = encadrantService.findOne(id);
        return ResponseUtil.wrapOrNotFound(encadrant);
    }

    /**
     * {@code DELETE  /encadrants/:id} : delete the "id" encadrant.
     *
     * @param id the id of the encadrant to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/encadrants/{id}")
    public ResponseEntity<Void> deleteEncadrant(@PathVariable Long id) {
        log.debug("REST request to delete Encadrant : {}", id);
        encadrantService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
