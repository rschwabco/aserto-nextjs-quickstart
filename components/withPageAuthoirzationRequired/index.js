import React from "react";

const withPageAuthorizationRequired = (Component = null, options = {}) => {
    class WithPageAuthorizationRequired extends React.Component {
        state = {
            loading: true,
            authorized: false,
            authorizationError: false
        };

        async componentDidMount() {
            const response = await fetch(options.path);
            const status = await response.status;
            this.setState((previous) => ({ ...previous, loading: false }))

            switch (status) {
                case 403: {
                    this.setState((previous) => ({ ...previous, authorized: false }))
                    break;
                }
                case 500: {
                    this.setState((previous) => ({ ...previous, authorizationError: true }))
                    break;
                }
                case 200: {
                    this.setState((previous) => ({ ...previous, authorized: true }))
                    break;
                }
            }
        }

        render() {
            const { loading, authorized, authorizationError } = this.state;

            if (loading) {
                return <div />;
            }
            if (authorized) {
                return <Component {...this.props} />;
            } else {
                if (authorizationError) {
                    return <div>Authorization Error</div>
                }

                if (!authorized) {
                    return <div>This user is unauthorized to view this content.</div>
                }
            }
        }
    }

    return WithPageAuthorizationRequired;
};

export default withPageAuthorizationRequired;