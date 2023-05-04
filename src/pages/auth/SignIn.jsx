import React, { Component } from "react";
import { Navigate } from 'react-router-dom';

import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { login } from "../../actions/auth";

import { isEmail } from "validator";

const required = (value) => {
	if (!value) {
		return (
			<div className="text-red-500 text-xs mt-1 ml-1.5 font-medium" role="alert">
				This field is required!
			</div>
		);
	}
};

const email = value => {
	if (!isEmail(value)) {
		return (
			<div className="text-red-500 text-xs mt-1 ml-1.5 font-medium" role="alert">
				This is not a valid email.
			</div>
		);
	}
};

class Login extends Component {
	constructor(props) {
		super(props);
		this.handleLogin = this.handleLogin.bind(this);
		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangePassword = this.onChangePassword.bind(this);

		this.state = {
			username: "",
			password: "",
			loading: false,
		};
	}

	onChangeUsername(e) {
		this.setState({
			username: e.target.value,
		});
	}

	onChangePassword(e) {
		this.setState({
			password: e.target.value,
		});
	}

	handleLogin(e) {
		e.preventDefault();

		this.setState({
			loading: true,
		});

		this.form.validateAll();

		const { dispatch, history } = this.props;

		if (this.checkBtn.context._errors.length === 0) {
			dispatch(login(this.state.username, this.state.password))
				.then(() => {
					history.push("/profile");
					window.location.reload();
				})
				.catch(() => {
					this.setState({
						loading: false
					});
				});
		} else {
			this.setState({
				loading: false,
			});
		}
	}

	render() {
		const { isLoggedIn, message } = this.props;

		if (isLoggedIn) {
			return <Navigate to="/profile" />;
		}

		return (
			<div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mt-10 lg:mb-10 lg:items-center lg:justify-start">
				{/* Sign in section */}
				<div className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
					<h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
						Sign In
					</h4>
					<p className="mb-9 ml-1 text-base text-gray-600">
						Enter your email and password to sign in!
					</p>
					<div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800">
						<div className="rounded-full text-xl">
							<FcGoogle />
						</div>
						<h5 className="text-sm font-medium text-navy-700 dark:text-white">
							Sign In with Google
						</h5>
					</div>
					<div className="mb-6 flex items-center  gap-3">
						<div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
						<p className="text-base text-gray-600 dark:text-white"> or </p>
						<div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
					</div>

					<Form
						onSubmit={this.handleLogin}
						ref={(c) => {
							this.form = c;
						}}
					>
						<div className="form-group">
							<label htmlFor="email" className="text-sm text-navy-700 dark:text-white ml-1.5 font-medium">Email*</label>
							<Input
								type="text"
								className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
								name="username"
								value={this.state.username}
								onChange={this.onChangeUsername}
								validations={[required, email]}
								label="Email*"
								placeholder="mail@simmmple.com"
								id="email"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="password" className="mt-2 block text-sm text-navy-700 dark:text-white ml-1.5 font-medium">Password*</label>
							<Input
								type="password"
								className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 dark:!border-white/10 dark:text-white"
								name="password"
								value={this.state.password}
								onChange={this.onChangePassword}
								validations={[required]}
								label="Password*"
								placeholder="Min. 8 characters"
								id="password"
							/>
						</div>

						<div className="mt-6 mb-4 flex items-center justify-between px-2">
							<div className="flex items-center">
								<Checkbox />
								<p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
									Keep me logged In
								</p>
							</div>
							<a
								className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
								href="#"
							>
								Forgot Password?
							</a>
						</div>

						<div className="form-group">
							<button
								className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
								disabled={this.state.loading}
							>
								{this.state.loading && (
									<span className="spinner-border spinner-border-sm"></span>
								)}
								<span>Sign In</span>
							</button>
						</div>

						{message && (
							<div className="form-group">
								<div className="alert alert-danger" role="alert">
									{message}
								</div>
							</div>
						)}
						<CheckButton
							style={{ display: "none" }}
							ref={(c) => {
								this.checkBtn = c;
							}}
						/>
					</Form>

					<div className="mt-4">
						<span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
							Not registered yet?
						</span>
						<a
							href="#"
							className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
						>
							Create an account
						</a>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { isLoggedIn } = state.auth;
	const { message } = state.message;
	return {
		isLoggedIn,
		message
	};
}

export default connect(mapStateToProps)(Login);