/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-classes-per-file */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { toWidget, viewToModelPositionOutsideModelElement } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import Command from '@ckeditor/ckeditor5-core/src/command';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import './insert-tag.css';

class InsertTagCommand extends Command {
  execute({ tagData }) {
    const { editor } = this;
    const { selection } = editor.model.document;

    editor.model.change(writer => {
      const insertTag = writer.createElement('insertTag', {
        ...Object.fromEntries(selection.getAttributes()),
        tagData,
      });

      // ... and insert it into the document.
      editor.model.insertContent(insertTag);

      // Put the selection on the inserted element.
      writer.setSelection(insertTag, 'on');
    });
  }

  refresh() {
    const { model } = this.editor;
    const { selection } = model.document;

    const isAllowed = model.schema.checkChild(selection.focus.parent, 'insertTag');

    this.isEnabled = isAllowed;
  }
}

class InsertTagUI extends Plugin {
  init() {
    const { editor } = this;
    editor.ui.componentFactory.add('insertTag', locale => {
      const view = new ButtonView(locale);
      const config = editor.config.get('insertTag');
      view.set({
        label: config.buttonTitle,
        tooltip: true,
        withText: true,
      });

      view.on('execute', () => {
        // console.log('evt', evt);
        config.openModal();
        // console.log(onOpen);
        /*
        editor.execute('insertTag', { value: 'Tag Content' });
        editor.editing.view.focus();
        */
        document.addEventListener(
          'canInsertTag',
          (e) => {
            editor.execute('insertTag', { tagData: e.detail });
            editor.editing.view.focus();
            // alert('done');
          },
          false,
        );
      });

      return view;
    });
  }
}

class InsertTagEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    console.log('InsertTagEditing#init() got called');

    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add('insertTag', new InsertTagCommand(this.editor));

    this.editor.editing.mapper.on(
      'viewToModelPosition',
      viewToModelPositionOutsideModelElement(
        this.editor.model,
        viewElement => viewElement.hasClass('custom-tag'),
      ),
    );
  }

  _defineSchema() {
    const { schema } = this.editor.model;

    schema.register('insertTag', {
      allowWhere: '$text',
      isInline: true,
      isObject: true,
      allowAttributesOf: '$text',
      allowAttributes: ['tagData'],
    });
  }

  _defineConverters() {
    const { conversion } = this.editor;
    function createInsertTagView(modelItem, viewWriter) {
      const tagData = modelItem.getAttribute('tagData');
      const insertTagView = viewWriter.createContainerElement('span', {
        class: 'custom-tag',
        ...tagData,
      }, {
        isAllowedInsideAttributeElement: true,
      });
      const innerText = viewWriter.createText(`_#_${tagData.tagname}_#_`);
      viewWriter.insert(viewWriter.createPositionAt(insertTagView, 0), innerText);
      return insertTagView;
    }

    conversion.for('upcast').elementToElement({
      view: {
        name: 'span',
        classes: ['custom-tag'],
      },
      model: (viewElement, { writer: modelWriter }) => {
        const attributes = Array.from(viewElement.getAttributes());
        const tagData = {};
        attributes.forEach(item => {
          if (item[0] !== 'class') {
            // eslint-disable-next-line prefer-destructuring
            tagData[item[0]] = item[1];
          }
        });
        const tagContent = viewElement.getChild(0).data;
        if (tagContent) {
          tagData.tagname = tagContent.replaceAll('_#_', '');
        }
        return modelWriter.createElement('insertTag', {
          tagData,
        });
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'insertTag',
      view: (modelItem, { writer: viewWriter }) => {
        const widgetElement = createInsertTagView(modelItem, viewWriter);

        // Enable widget handling on a insertTag element inside the editing view.
        return toWidget(widgetElement, viewWriter);
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'insertTag',
      view: (modelItem, { writer: viewWriter }) => createInsertTagView(modelItem, viewWriter),
    });
  }
}

export default class InsertTag extends Plugin {
  static get requires() {
    return [InsertTagEditing, InsertTagUI];
  }
}
