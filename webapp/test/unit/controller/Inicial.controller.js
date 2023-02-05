/*global QUnit*/

sap.ui.define([
	"google_imagens/controller/Inicial.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Inicial Controller");

	QUnit.test("I should test the Inicial controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
