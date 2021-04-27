import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import { required, maxLength20, minLength8 } from "../../helpers/validation";
import { ReactComponent as IconShieldLockFill } from "bootstrap-icons/icons/shield-lock-fill.svg";
import { ReactComponent as IconKeyFill } from "bootstrap-icons/icons/key-fill.svg";

const ChangePasswordForm = (props) => {
  const { handleSubmit, submitting, onSubmit, submitFailed } = props;
  return (
    <div className="card border-warning">
      <h6 className="card-header bg-warning text-white">
        <IconKeyFill /> Change Details
      </h6>
      <div className="card-body">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
          noValidate
        >
          <div className="row">
            <div className="col-md-6">
            <Field
            name="currentPassword"
            type="password"
            label="Current Password"
            component={renderFormGroupField}
            placeholder="******"
            icon={IconShieldLockFill}
            validate={[required, maxLength20, minLength8]}
            required={true}
            maxLength="20"
            minLength="8"
            className="mb-3"
          />
            </div>

            <div className="col-md-6">
            <Field
            name="password"
            type="password"
            label="New Password"
            component={renderFormGroupField}
            placeholder="******"
            icon={IconShieldLockFill}
            validate={[required, maxLength20, minLength8]}
            required={true}
            maxLength="20"
            minLength="8"
            className="mb-3"
          />
            </div>
          </div>          
          
          
          <div className="row">
            <div className="col-md-6">
            <Field
            name="currentPassword"
            type="password"
            label="Current Password"
            component={renderFormGroupField}
            placeholder="******"
            icon={IconShieldLockFill}
            validate={[required, maxLength20, minLength8]}
            required={true}
            maxLength="20"
            minLength="8"
            className="mb-3"
          />
            </div>

            <div className="col-md-6">
            <Field
            name="password"
            type="password"
            label="New Password"
            component={renderFormGroupField}
            placeholder="******"
            icon={IconShieldLockFill}
            validate={[required, maxLength20, minLength8]}
            required={true}
            maxLength="20"
            minLength="8"
            className="mb-3"
          />
            </div>
          </div>          
          
          <div className="row">
            <div className="col-md-6">
            <Field
            name="currentPassword"
            type="password"
            label="Current Password"
            component={renderFormGroupField}
            placeholder="******"
            icon={IconShieldLockFill}
            validate={[required, maxLength20, minLength8]}
            required={true}
            maxLength="20"
            minLength="8"
            className="mb-3"
          />
            </div>

            <div className="col-md-6">
            <Field
            name="password"
            type="password"
            label="New Password"
            component={renderFormGroupField}
            placeholder="******"
            icon={IconShieldLockFill}
            validate={[required, maxLength20, minLength8]}
            required={true}
            maxLength="20"
            minLength="8"
            className="mb-3"
          />
            </div>
          </div>          
          
          
          <button
            type="submit"
            className="btn btn-success btn-block"
            disabled={submitting}
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default compose(
  reduxForm({
    form: "changepassword",
  })
)(ChangePasswordForm);
