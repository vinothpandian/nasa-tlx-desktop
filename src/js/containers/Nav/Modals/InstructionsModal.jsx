import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

function InstructionsModal(props) {
  return (
    <Modal isOpen={props.modal} size="lg" toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Instructions</ModalHeader>
      <ModalBody>
        <p>The following assessment is used to measure your personal opinion on how much
          workload was required of you during the task you just completed.
        </p>
        <p>Please rate all six workload measures by clicking a point on the scale that best
          represents your experience with the task you just completed.
        </p>
        <p>Consider each scale individually and select your responses carefully.</p>
        <p>Please note that the Performance scale is a measure of how well you think you
          did on the task with Poor performance on the left, and Good performance on
          the right.
        </p>
        <p>Your ratings will play an important role in the evaluation being conducted. Your
          active participation is essential to the success of this experiment, and is greatly
          appreciated.
        </p>
      </ModalBody>
    </Modal>);
}

InstructionsModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default InstructionsModal;
