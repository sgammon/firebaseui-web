/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Provides utilities for working with Material Design Lite.
 */

goog.provide('firebaseui.auth.ui.mdl');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.dom.classlist');

goog.require('componentHandler.downgradeElements');
goog.require('componentHandler.upgradeElement');

/** @suppress {extraRequire} */
goog.require('material.MaterialRipple');
/** @suppress {extraRequire} */
goog.require('material.MaterialLayout');
/** @suppress {extraRequire} */
goog.require('material.MaterialButton');
/** @suppress {extraRequire} */
goog.require('material.MaterialTextField');
/** @suppress {extraRequire} */
goog.require('material.MaterialSpinner');
/** @suppress {extraRequire} */
goog.require('material.MaterialProgress');


/**
 * Initializes MDL for the given element and all MDL-styled children. The MDL
 * library attaches event listeners and modifies the DOM as appropriate here.
 *
 * @param {?Element} element
 */
firebaseui.auth.ui.mdl.upgrade = function(element) {
  firebaseui.auth.ui.mdl.performOnMdlComponents_(element, (el) => {
    if (!!el)
      componentHandler.upgradeElement(/** @type {!Element} */ (el));
  });
};

/**
 * Removes MDL from the given element and all MDL-styled children. The MDL
 * library detaches event listeners and removes DOM modifications that it
 *
 * previously did when upgrade()ing.
 * @param {?Element} element
 */
firebaseui.auth.ui.mdl.downgrade = function(element) {
  firebaseui.auth.ui.mdl.performOnMdlComponents_(element, (el) => {
    if (!!el)
      componentHandler.downgradeElements(/** @type {!Node} */ (el));
  });
};


/**
 * The list of CSS classes to upgrade to MDL components.
 *
 * @private @const {!Array<!string>}
 */
firebaseui.auth.ui.mdl.MDL_COMPONENT_CLASSES_ = [
  goog.getCssName('mdl-js-textfield'),
  goog.getCssName('mdl-js-progress'),
  goog.getCssName('mdl-js-spinner'),
  goog.getCssName('mdl-js-button')
];


/**
 * Performs an operation on all MDL elements within a given element (e.g.
 * upgradeElement, downgradeElements), including the element itself.
 *
 * @param {?Element} element
 * @param {!function(?Element): void} operation
 * @private
 */
firebaseui.auth.ui.mdl.performOnMdlComponents_ = function(element, operation) {
  if (!element) {
    return;
  }
  goog.array.forEach(firebaseui.auth.ui.mdl.MDL_COMPONENT_CLASSES_,
      function(className) {
    if (goog.dom.classlist.contains(element, className)) {
      operation(element);
    }

    var matchingElements = goog.dom.getElementsByClass(className, element);
    goog.array.forEach(matchingElements, function(mdlElement) {
      operation(mdlElement);
    });
  });
};
