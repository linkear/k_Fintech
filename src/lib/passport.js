const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// const path = require("path");
// const CryptoJS = require("crypto-js");
const orm = require("../Database/dataBase.orm")
// const request = require('request');
// const fs = require('fs');
const sql = require("../Database/dataBase.sql");
const helpers = require("./helpers");

//INICIO DE SESION
passport.use(
	"local.signin",
	new LocalStrategy(
		{
			usernameField: "correo_electronico_Dueño",
			passwordField: "password_Dueño",
			passReqToCallback: true,
		},
		async (req, correo_electronico_Dueño, password_Dueño, done) => {
			const rows = await orm.dueño.findOne({ where: { correo_electronico_Dueño: correo_electronico_Dueño } });
			if (rows) {
				const user = rows;
				const validPassword = await helpers.matchPassword(
					password_Dueño,
					user.password_Dueño
				)
				if (validPassword) {
					done(
						null,
						user,
						req.flash(
							"message",
							"Bienvenido" + " " + user.correo_electronico_Dueño
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
//REGISTRO
passport.use(
	"local.signup",
	new LocalStrategy(
		{
			usernameField: "correo_electronico_Dueño",
			passwordField: "password_Dueño",
			passReqToCallback: true,
		},
		async (req, correo_electronico_Dueño, password_Dueño, done) => {
			const usuarios = await orm.dueño.findOne({ where: { correo_electronico_Dueño: correo_electronico_Dueño }});
			if (usuarios === null) {
				const { nombres_Dueño, apellidos_Dueño, cedula_Dueño, celular_Dueño, correo_electronico_Dueño, password_Dueño } = req.body;
				let nuevoDueño = {
					nombres_Dueño,
					apellidos_Dueño,
					cedula_Dueño,
					celular_Dueño,
					correo_electronico_Dueño,
					password_Dueño
				};
				nuevoDueño.password_Dueño = await helpers.encryptPassword(password_Dueño);
				const resultado = await orm.dueño.create(nuevoDueño);
				nuevoDueño.id = resultado.insertId;
				return done(null, nuevoDueño)
				
			} else {
				if (usuarios) {
					const usuario = usuarios;
					if (username == usuario.nombres_Dueño) {
						done(null, false, req.flash("message", "El nombre de usuario ya existe."));
					} else {
						let nuevoDueño = {
							correo_electronico_Dueño,
							password_Dueño
						};
						nuevoDueño.password_Dueño = await helpers.encryptPassword(password_Dueño);
						const resultado = await orm.dueño.create(nuevoDueño);
						nuevoDueño.id = resultado.insertId;
						return done(null, nuevoDueño);
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
