import { Component, OnInit, Inject } from '@angular/core';
import { StateService } from "ui-router-ng2";
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

<%_ if (enableTranslation){ _%>
import { TranslateService } from 'ng2-translate/ng2-translate';
<%_ } _%>

import { Account, LoginService, Principal<% if (enableTranslation){ %>, <%=jhiPrefixCapitalized%>LanguageService <% } %>} from "../shared";

@Component({
    selector: 'home',
    templateUrl: 'app/home/home.html'
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    constructor(private principal: Principal,
                private $state: StateService,
                private loginService : LoginService<%_ if (enableTranslation){ _%>,
                translateService: TranslateService,
                <%=jhiPrefix%>LangService: <%=jhiPrefixCapitalized%>LanguageService<%_ } _%>) {
        <%_ if (enableTranslation){ _%>
        <%=jhiPrefix%>LangService.setLocation('home');    
        <%_ } _%>
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    register() {
        this.$state.go('register');
    }

    login(template) {
        this.modalRef = this.loginService.open(template);
    }
}
