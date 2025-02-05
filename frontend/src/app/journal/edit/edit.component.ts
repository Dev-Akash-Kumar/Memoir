import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Journal } from '../models/journal';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { JournalService } from '../services/journal.service';
import { Router } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from 'primeng/datepicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    AngularEditorModule,
    ReactiveFormsModule,
    CommonModule,
    DatePickerModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    ConfirmDialog,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  Journal: Journal[] = [];
  content: string = '';
  showNoPreviewEditor: boolean = false;
  showPreviewEditor: boolean = true;
  showEnablePreviewBtn: boolean = false;
  showDisablePreviewBtn: boolean = true;
  previewContent: string = ''; // To store the content to be displayed in preview
  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  showCalendar = false;
  journaTitle: string | null = '';
  journalDate!: Date;
  id: string | null = null;
  data: any;
  constructor(
    private journalService: JournalService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  // use this editor config when preview is not enabled
  noPreview: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '80vh',
    maxHeight: 'auto',
    width: '80vw',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: 'Times New Roman',
    defaultFontSize: '4',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    // customClasses: [
    //   {
    //     name: 'quote',
    //     class: 'quote',
    //   },
    //   {
    //     name: 'redText',
    //     class: 'redText',
    //   },
    //   {
    //     name: 'titleText',
    //     class: 'titleText',
    //     tag: 'h1',
    //   },
    // ],
    // uploadUrl: 'v1/image',
    // upload: (file: File) => { ... }
    // uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        // 'undo',
        // 'redo',
        // 'bold',
        // 'italic',
        // 'underline',
        // 'strikeThrough',
        // 'subscript',
        // 'superscript',
        // 'justifyLeft',
        // 'justifyCenter',
        // 'justifyRight',
        // 'justifyFull',
        // 'indent',
        // 'outdent',
        // 'insertUnorderedList',
        // 'insertOrderedList',
        // 'heading',
        // 'fontName',
      ],
      [
        //'fontSize',
        // 'textColor',
        'backgroundColor',
        //'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode',
      ],
    ],
  };

  // use this editor config when preview is enabled
  previewEnable: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '50vh',
    maxHeight: 'auto',
    width: '50vw',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: 'Times New Roman',
    defaultFontSize: '4',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    // customClasses: [
    //   {
    //     name: 'quote',
    //     class: 'quote',
    //   },
    //   {
    //     name: 'redText',
    //     class: 'redText',
    //   },
    //   {
    //     name: 'titleText',
    //     class: 'titleText',
    //     tag: 'h1',
    //   },
    // ],
    // uploadUrl: 'v1/image',
    // upload: (file: File) => { ... }
    // uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    // toolbarHiddenButtons: [['bold', 'italic']],
    toolbarHiddenButtons: [
      [
        // 'undo',
        // 'redo',
        // 'bold',
        // 'italic',
        // 'underline',
        // 'strikeThrough',
        // 'subscript',
        // 'superscript',
        // 'justifyLeft',
        // 'justifyCenter',
        // 'justifyRight',
        // 'justifyFull',
        // 'indent',
        // 'outdent',
        // 'insertUnorderedList',
        // 'insertOrderedList',
        // 'heading',
        // 'fontName',
      ],
      [
        //'fontSize',
        // 'textColor',
        'backgroundColor',
        //'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode',
      ],
    ],
  };

  journalEditForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    // extract id from url
    this.id = this.route.snapshot.paramMap['get']('id');
    // load details by id and set in formconntrol
    this.journalService.getJournalByID(this.id!).subscribe((res) => {
      this.data = res;
      this.journalEditForm.get('title')?.setValue(this.data.data.title);
      this.journalEditForm.get('date')?.setValue(this.data.data.date);
      this.journalEditForm.get('content')?.setValue(this.data.data.content);
    });

    // change value of journalDate according to date in form
    this.journalEditForm.get('date')?.valueChanges.subscribe((value: Date) => {
      this.journalDate = value;
    });

    this.formatDate(this.journalDate);

    // get title and date from form and assign to get title, date in preview content
    this.journalEditForm
      .get('title')
      ?.valueChanges.subscribe((value: string) => {
        this.journaTitle = value;
      });
    this.journalDate = this.journalEditForm.get('date')?.value;

    // assign default content of editor to preview content
    this.previewContent = this.journalEditForm.get('content')?.value;

    // update preview content according to editor content
    this.journalEditForm
      .get('content')
      ?.valueChanges.subscribe((value: string) => {
        this.previewContent = value; // Update the preview content manually
      });
  }

  enablePreview() {
    this.showPreviewEditor = true;
    this.showNoPreviewEditor = false;
    this.showEnablePreviewBtn = false;
    this.showDisablePreviewBtn = true;
  }

  disablePreview() {
    this.showPreviewEditor = false;
    this.showNoPreviewEditor = true;
    this.showEnablePreviewBtn = true;
    this.showDisablePreviewBtn = false;
  }

  // Custom date format function
  formatDate(currentDate: Date) {
    const dateObj = new Date(currentDate);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    const suffix = this.getDaySuffix(day); // Get the day suffix like 'st', 'nd', 'rd', 'th'
    return `${day}${suffix} ${month}, ${year}`;
  }

  // Function to determine the day suffix (e.g. 1st, 2nd, 3rd, 4th)
  getDaySuffix(day: number): string {
    const j = day % 10,
      k = day % 100;
    if (j === 1 && k !== 11) {
      return 'st';
    }
    if (j === 2 && k !== 12) {
      return 'nd';
    }
    if (j === 3 && k !== 13) {
      return 'rd';
    }
    return 'th';
  }

  onSubmit() {
    if (this.journalEditForm.valid) {
      const data = this.journalEditForm.value;
      console.log(data);
      this.confirmationService.confirm({
        message: 'Are you sure that you want to Save?',
        header: 'Confirmation',
        closable: true,
        closeOnEscape: true,
        icon: 'pi pi-exclamation-triangle',
        rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true,
        },
        acceptButtonProps: {
          label: 'Save',
        },
        accept: () => {
          this.journalService.addJournal(data).subscribe(
            (res) => {
              this.messageService.add({
                severity: 'info',
                summary: 'Saved !!',
                detail: 'Journal saved successfully !!',
              });
              this.confirmationService.close();

              setTimeout(() => {
                this.navigateToList(); // Navigate after 3 seconds
              }, 3000);
            },
            (error) => {
              console.log('error', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error !!',
                detail: 'Failed to save journal !!',
                life: 3000,
              });
              this.confirmationService.close();
            }
          );
        },
        reject: () => {
          // Show rejection message if the user cancels
          this.messageService.add({
            severity: 'error',
            summary: 'Cancelled !!',
            detail: 'Failed to save journal !!',
            life: 3000,
          });
          this.confirmationService.close();
        },
      });
    } else {
      console.log('Form is invalid');
      this.messageService.add({
        severity: 'error',
        summary: 'Missing Title or Content !!',
        detail: 'Please fill Title and Content correctly !!',
      });
      this.confirmationService.close();
    }
  }

  navigateToList(): void {
    this.router.navigate(['journal/list']);
  }
}
