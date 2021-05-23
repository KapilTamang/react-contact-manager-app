import React, { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';

const Alerts = () => {
	const alertContext = useContext(AlertContext);

	const { alerts } = alertContext;

	return (
		alerts.length > 0 &&
		alerts.map((alert) => (
			<div key={alert.id} className={`alert alert-${alert.type}`}>
				{alert.type === 'danger' ? (
					<i className="fas fa-info-circle text-danger"></i>
				) : (
					<i class="fas fa-check-circle text-success"></i>
				)}
				&nbsp; {alert.msg}
			</div>
		))
	);
};

export default Alerts;
