import React, { Fragment, useEffect, useState } from 'react'
import { useLocation } from 'react-router';

function Error() {
    const location = useLocation();

    const [error, setError] = useState(null);
    useEffect(() => {
        const error = new URLSearchParams(location.search).get("error");
        if (error) {
            fetch(`http://127.0.0.1:4433/self-service/errors?error=${error}`, {
                credentials: 'include'
            }).then(r => r.json()).then((data) => {
                setError(data);
            });
        }
    }, [location.search]);

    return (
        <div>
            {error ? <>
                {
                    error.errors.map((err, i) => {
                        return <Fragment key={i}>
                            <h1>{err.code} {err.status}</h1>
                            <h3>{err.message}</h3>
                            <h3>{err.reason}</h3>
                            <hr />
                        </Fragment>
                    })
                }
            </> : null}
        </div>
    )
}

export default Error
