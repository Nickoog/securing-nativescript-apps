import { Component, OnInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    items: Array<Item>;

    constructor(
        private router: Router,
        public authService: AuthService,
        private itemService: ItemService
    ) {}

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    public logout() {
        this.authService.logout().subscribe(
            () => {
                this.router.navigate(["/auth"]);
            },
            error => {
                alert("Sorry, we couldn't log you out");
            }
        );
    }
}
