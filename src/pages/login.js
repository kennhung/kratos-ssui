import React, { useEffect, useState, Fragment } from 'react'
import { useLocation } from 'react-router';

function Login() {
    const location = useLocation();

    const [flowData, setFlowData] = useState(null);
    useEffect(() => {
        const flow = new URLSearchParams(location.search).get("flow");
        if (!flow) {
            window.location.href = "http://127.0.0.1:4433/self-service/login/browser";
        } else {
            fetch(`http://127.0.0.1:4433/self-service/login/flows?id=${flow}`, {
                credentials: 'include'
            }).then(r => r.json()).then((data) => {
                setFlowData(data);
            });
        }
    }, [location.search]);

    const [formData, setFormData] = useState({});
    useEffect(() => {
        if (flowData && flowData.methods && flowData.methods.password) {
            const newFormData = {};
            flowData.methods.password.config.fields.forEach(({ name, value }) => {
                newFormData[name] = value;
            });
            setFormData(newFormData);
        }
    }, [flowData]);

    return (
        <div>
            {
                flowData ? flowData.error ?
                    <>
                        <h1>Error</h1>
                        <p>{flowData.error.message}</p>
                    </> :
                    <>
                        {
                            flowData.methods && flowData.methods.password ? <>
                                <form action={flowData.methods.password.config.action} method={flowData.methods.password.config.method}>
                                    {
                                        flowData.methods.password.config.fields.map((f) => {
                                            return <Fragment key={f.name}>
                                                <label>{f.name}</label>
                                                <input
                                                    type={f.type}
                                                    name={f.name}
                                                    required={f.required}
                                                    value={formData[f.name] || ""}
                                                    onChange={(e) => {
                                                        setFormData({
                                                            ...formData,
                                                            [f.name]: e.target.value
                                                        })
                                                    }}
                                                />
                                                <br />
                                            </Fragment>
                                        })
                                    }
                                    <button>Submit</button>
                                </form>
                            </> : null
                        }
                    </>
                    : null
            }
        </div>
    )
}

export default Login
