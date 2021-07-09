import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './etudiant.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const EtudiantDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const etudiantEntity = useAppSelector(state => state.etudiant.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="etudiantDetailsHeading">
          <Translate contentKey="stageApp.etudiant.detail.title">Etudiant</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{etudiantEntity.id}</dd>
          <dt>
            <span id="nom">
              <Translate contentKey="stageApp.etudiant.nom">Nom</Translate>
            </span>
          </dt>
          <dd>{etudiantEntity.nom}</dd>
          <dt>
            <span id="prenom">
              <Translate contentKey="stageApp.etudiant.prenom">Prenom</Translate>
            </span>
          </dt>
          <dd>{etudiantEntity.prenom}</dd>
          <dt>
            <span id="mail">
              <Translate contentKey="stageApp.etudiant.mail">Mail</Translate>
            </span>
          </dt>
          <dd>{etudiantEntity.mail}</dd>
          <dt>
            <span id="encadrant">
              <Translate contentKey="stageApp.etudiant.encadrant">Encadrant</Translate>
            </span>
          </dt>
          <dd>{etudiantEntity.encadrant}</dd>
          <dt>
            <Translate contentKey="stageApp.etudiant.encadrant">Encadrant</Translate>
          </dt>
          <dd>{etudiantEntity.encadrant ? etudiantEntity.encadrant.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/etudiant" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/etudiant/${etudiantEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default EtudiantDetail;
