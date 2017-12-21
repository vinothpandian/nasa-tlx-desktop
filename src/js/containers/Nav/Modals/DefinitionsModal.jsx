import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import definitions from '../../../../assets/datastore/definitions.json';

const shortid = require('shortid');

function DefinitionsModal(props) {
  const definitionData = [];

  Object.entries(definitions).forEach(([key, value]) => {
    definitionData.push(<dt key={shortid.generate()} className="col-3 mt-4">{key}</dt>);
    definitionData.push(<dd key={shortid.generate()} className="col-9 mt-4">{value}</dd>);
  });

  return (
    <Modal isOpen={props.modal} size="lg" toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Definitions</ModalHeader>
      <ModalBody>
        <dl className="row">
          {definitionData}
        </dl>
      </ModalBody>
    </Modal>
  );
}

DefinitionsModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default DefinitionsModal;
