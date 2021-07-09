import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './encadrant.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const EncadrantDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const encadrantEntity = useAppSelector(state => state.encadrant.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="encadrantDetailsHeading">
          <Translate contentKey="stageApp.encadrant.detail.title">Encadrant</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{encadrantEntity.id}</dd>
          <dt>
            <span id="nom">
              <Translate contentKey="stageApp.encadrant.nom">Nom</Translate>
            </span>
          </dt>
          <dd>{encadrantEntity.nom}</dd>
          <dt>
            <span id="prenom">
              <Translate contentKey="stageApp.encadrant.prenom">Prenom</Translate>
            </span>
          </dt>
          <dd>{encadrantEntity.prenom}</dd>
          <dt>
            <span id="mail">
              <Translate contentKey="stageApp.encadrant.mail">Mail</Translate>
            </span>
          </dt>
          <dd>{encadrantEntity.mail}</dd>
        </dl>
        <Button tag={Link} to="/encadrant" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/encadrant/${encadrantEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default EncadrantDetail;
