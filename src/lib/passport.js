const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require("path");
const CryptoJS = require("crypto-js");
const orm = require("../Database/dataBase.orm")
const request = require('request');
const fs = require('fs');


const sql = require("../Database/dataBase.sql");
const helpers = require("./helpers");

passport.use(
	"local.signin",
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password",
			passReqToCallback: true,
		},
		async (req, username, password, done) => {
			const rows = await orm.client.findOne({ where: { usernameClient: username, stateClient: 'activado' } });
			if (rows) {
				const user = rows;
				const contraseña = await CryptoJS.AES.decrypt(
					user.passwordClient,
					"secret"
				);
				const validPassword = contraseña.toString(CryptoJS.enc.Utf8);
				if (validPassword == password) {
					done(
						null,
						user,
						req.flash(
							"message",
							"Bienvenido" + " " + user.usernameClient
						)
					);
				} else {
					done(null, false, req.flash("message", "Datos incorrectos"));
				}
			} else {
				return done(
					null,
					false,
					req.flash("message", "El nombre de usuario no existe.")
				);
			}
		}
	)
);

passport.use(
	"local.signup",
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password",
			passReqToCallback: true,
		},
		async (req, username, password, done) => {
			const usuarios = await orm.client.findOne({
				where: { usernameClient: username },
			});
			if (usuarios === null) {
				const { idUsuarios, nameClient, lastNameClient, typeIdentificationClient, identificationCardClient, emailClient, phoneClient, nameTypePerson, nameGener } = req.body;
				let newClient = {
					idClient: idUsuarios,
					nameClient,
					lastNameClient,
					typeIdentificationClient,
					identificationCardClient,
					emailClient,
					phoneClient,
					usernameClient: username,
					passwordClient: password,
					stateClient: 'activado'
				};
				newClient.nameClient = await helpers.encryptPassword(nameClient);
				newClient.lastNameClient = await helpers.encryptPassword(lastNameClient);
				newClient.typeIdentificationClient = await helpers.encryptPassword(typeIdentificationClient);
				newClient.identificationCardClient = await helpers.encryptPassword(identificationCardClient);
				newClient.emailClient = await helpers.encryptPassword(emailClient);
				newClient.phoneClient = await helpers.encryptPassword(phoneClient);
				newClient.passwordClient = await helpers.encryptPassword(password);

				if (nameClient != 'seleccion' && nameTypePerson != 'seleccion') {
					let newDetail = {
						clientIdClient: idUsuarios,
						generIdGener: nameGener,
						typePersonIdTypePerson: nameTypePerson,
					};

					const resultado = await orm.client.create(newClient);
					await orm.clientDetail.create(newDetail);

					newClient.id = resultado.insertId;

					const imagenUsuario = req.files.imagenUsuario;
					const validacion = path.extname(imagenUsuario.name);

					const extencion = [".PNG", ".JPG", ".JPEG", ".GIF", ".TIF", ".png", ".jpg", ".jpeg", ".gif", ".tif", ".JFIF"];

					if (!extencion.includes(validacion)) {
						req.flash("success", "Imagen no compatible.");
					}

					if (!req.files) {
						req.flash("success", "Imagen no insertada.");
					}

					const filePath = __dirname + '/../public/img/user/' + imagenUsuario.name;

					imagenUsuario.mv(filePath, (err) => {
						if (err) {
							console.error(err);
							req.flash("success", "Error al guardar la imagen.");
						} else {
							sql.query("UPDATE clients SET imagesClient = ? WHERE idClient = ?", [imagenUsuario.name, idUsuarios])
							const formData = {
								image: {
									value: fs.createReadStream(filePath),
									options: {
										filename: imagenUsuario.name,
										contentType: imagenUsuario.mimetype,
									},
								},
							};

							const postRequesten = request.post({
								url: 'http://localhost:5000/imagenClient',
								formData: formData,
							});

							req.setTimeout(0);

							postRequesten.on('error', function (err) {
								console.error('upload failed:', err);
								req.flash("success", "Error al subir imagen.");
							});

							postRequesten.on('response', function (response) {
								console.log('Upload successful! Server responded with:', response.statusCode);
							});
						}
					});
					return done(null, newClient);
				} else {
					req.flash('message', 'llene todos los campos por favor')
					return false
				}
			} else {
				if (usuarios) {
					const usuario = usuarios;
					if (username == usuario.usernameClient) {
						done(null, false, req.flash("message", "El nombre de usuario ya existe."));
					} else {
						const { idUsuarios, nameClient, lastNameClient, typeIdentificationClient, identificationCardClient, emailClient, phoneClient, nameTypePerson, nameGener } = req.body;
						let newClient = {
							idClient: idUsuarios,
							nameClient,
							lastNameClient,
							typeIdentificationClient,
							identificationCardClient,
							emailClient,
							phoneClient,
							usernameClient: username,
							passwordClient: password,
							stateClient: 'activo'
						};
						newClient.nameClient = await helpers.encryptPassword(nameClient);
						newClient.lastNameClient = await helpers.encryptPassword(lastNameClient);
						newClient.typeIdentificationClient = await helpers.encryptPassword(typeIdentificationClient);
						newClient.identificationCardClient = await helpers.encryptPassword(identificationCardClient);
						newClient.emailClient = await helpers.encryptPassword(emailClient);
						newClient.phoneClient = await helpers.encryptPassword(phoneClient);
						newClient.passwordClient = await helpers.encryptPassword(password);
						
						if (nameClient != 'seleccion' && nameTypePerson != 'seleccion') {
							let newDetail = {
								clientIdClient: idUsuarios,
								generIdGener: nameGener,
								typePersonIdTypePerson: nameTypePerson,
							};

							const resultado = await orm.client.create(newClient);
							await orm.clientDetail.create(newDetail);

							newClient.id = resultado.insertId;

							const imagenUsuario = req.files.imagenUsuario;
							const validacion = path.extname(imagenUsuario.name);

							const extencion = [".PNG", ".JPG", ".JPEG", ".GIF", ".TIF", ".png", ".jpg", ".jpeg", ".gif", ".tif", ".JFIF"];

							if (!extencion.includes(validacion)) {
								req.flash("success", "Imagen no compatible.");
							}

							if (!req.files) {
								req.flash("success", "Imagen no insertada.");
							}

							const filePath = __dirname + '/../public/img/user/' + imagenUsuario.name;

							imagenUsuario.mv(filePath, (err) => {
								if (err) {
									console.error(err);
									req.flash("success", "Error al guardar la imagen.");
								} else {
									sql.query("UPDATE clients SET imagesClient = ? WHERE idClient = ?", [imagenUsuario.name, idUsuarios])
									const formData = {
										image: {
											value: fs.createReadStream(filePath),
											options: {
												filename: imagenUsuario.name,
												contentType: imagenUsuario.mimetype,
											},
										},
									};

									const postRequesten = request.post({
										url: 'http://localhost:5000/imagenClient',
										formData: formData,
									});

									req.setTimeout(0);

									postRequesten.on('error', function (err) {
										console.error('upload failed:', err);
										req.flash("success", "Error al subir imagen.");
									});

									postRequesten.on('response', function (response) {
										console.log('Upload successful! Server responded with:', response.statusCode);
									});
								}
							});
							return done(null, newClient);
						} else {
							req.flash('message', 'llene todos los campos por favor')
							return false
						}
					}
				}
			}
		}
	)
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});
