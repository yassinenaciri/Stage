import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './etudiant.reducer';
import { IEtudiant } from 'app/shared/model/etudiant.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Etudiant = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const etudiantList = useAppSelector(state => state.etudiant.entities);
  const loading = useAppSelector(state => state.etudiant.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="etudiant-heading" data-cy="EtudiantHeading">
        <Translate contentKey="stageApp.etudiant.home.title">Etudiants</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="stageApp.etudiant.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="stageApp.etudiant.home.createLabel">Create new Etudiant</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {etudiantList && etudiantList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="stageApp.etudiant.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="stageApp.etudiant.nom">Nom</Translate>
                </th>
                <th>
                  <Translate contentKey="stageApp.etudiant.prenom">Prenom</Translate>
                </th>
                <th>
                  <Translate contentKey="stageApp.etudiant.mail">Mail</Translate>
                </th>
                <th>
                  <Translate contentKey="stageApp.etudiant.encadrant">Encadrant</Translate>
                </th>
                <th>
                  <Translate contentKey="stageApp.etudiant.encadrant">Encadrant</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {etudiantList.map((etudiant, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${etudiant.id}`} color="link" size="sm">
                      {etudiant.id}
                    </Button>
                  </td>
                  <td>{etudiant.nom}</td>
                  <td>{etudiant.prenom}</td>
                  <td>{etudiant.mail}</td>
                  <td>{etudiant.encadrant}</td>
                  <td>{etudiant.encadrant ? <Link to={`encadrant/${etudiant.encadrant.id}`}>{etudiant.encadrant.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${etudiant.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${etudiant.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${etudiant.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="stageApp.etudiant.home.notFound">No Etudiants found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Etudiant;
