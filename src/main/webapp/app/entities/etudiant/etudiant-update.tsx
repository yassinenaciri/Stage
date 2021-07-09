import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IEncadrant } from 'app/shared/model/encadrant.model';
import { getEntities as getEncadrants } from 'app/entities/encadrant/encadrant.reducer';
import { getEntity, updateEntity, createEntity, reset } from './etudiant.reducer';
import { IEtudiant } from 'app/shared/model/etudiant.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const EtudiantUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const encadrants = useAppSelector(state => state.encadrant.entities);
  const etudiantEntity = useAppSelector(state => state.etudiant.entity);
  const loading = useAppSelector(state => state.etudiant.loading);
  const updating = useAppSelector(state => state.etudiant.updating);
  const updateSuccess = useAppSelector(state => state.etudiant.updateSuccess);

  const handleClose = () => {
    props.history.push('/etudiant');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getEncadrants({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...etudiantEntity,
      ...values,
      encadrant: encadrants.find(it => it.id.toString() === values.encadrantId.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...etudiantEntity,
          encadrantId: etudiantEntity?.encadrant?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="stageApp.etudiant.home.createOrEditLabel" data-cy="EtudiantCreateUpdateHeading">
            <Translate contentKey="stageApp.etudiant.home.createOrEditLabel">Create or edit a Etudiant</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="etudiant-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField label={translate('stageApp.etudiant.nom')} id="etudiant-nom" name="nom" data-cy="nom" type="text" />
              <ValidatedField
                label={translate('stageApp.etudiant.prenom')}
                id="etudiant-prenom"
                name="prenom"
                data-cy="prenom"
                type="text"
              />
              <ValidatedField label={translate('stageApp.etudiant.mail')} id="etudiant-mail" name="mail" data-cy="mail" type="text" />
              <ValidatedField
                label={translate('stageApp.etudiant.encadrant')}
                id="etudiant-encadrant"
                name="encadrant"
                data-cy="encadrant"
                type="text"
              />
              <ValidatedField
                id="etudiant-encadrant"
                name="encadrantId"
                data-cy="encadrant"
                label={translate('stageApp.etudiant.encadrant')}
                type="select"
              >
                <option value="" key="0" />
                {encadrants
                  ? encadrants.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/etudiant" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default EtudiantUpdate;
